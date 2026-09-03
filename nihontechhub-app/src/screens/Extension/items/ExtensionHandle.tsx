import { useEffect, useRef } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';
import { Platform } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import { createPdf } from 'react-native-pdf-from-image';
import WebView, { WebViewProps } from 'react-native-webview';

import { AppWeb } from '@elements/AppWeb';
import { extractFileName, useAppSize } from '@utils/modules';

import { TExtensionFormValues, TExtensionHandleRef } from '../Extension.type';

// Script lấy tất cả ảnh blob và chuyển thành dataURL
const injectedJSCreatePDF = `(async function() {
    const imgs = Array.from(document.getElementsByTagName("img"))
      .filter(img => img.src.startsWith("blob:"))
      .filter(img => img.naturalWidth > 0 || typeof img.decode === "function");

    if (imgs.length === 0) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "IMAGE_ERROR",
        message: "No blob images found"
      }));
      return;
    }

    async function imgToDataURL(img) {
      if (typeof img.decode === "function") {
        try { await img.decode(); } catch {}
      }
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL("image/png");
    }

    const imageData = [];
    for (const img of imgs) {
      const dataURL = await imgToDataURL(img);
      imageData.push({ dataURL, w: img.naturalWidth, h: img.naturalHeight });
    }

    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: "IMAGES_DATA",
      data: imageData
    }));
  })(); 
  true;
`;

// Script lấy tất cả ảnh blob và chuyển thành dataURL
const injectedJSCreatePDFByCanvas = `(async function() {
    const imgs = Array.from(document.getElementsByTagName("canvas"))

    if (imgs.length === 0) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "IMAGE_ERROR",
        message: "No blob images found"
      }));
      return;
    }

    async function imgToDataURL(c) {
      return c.toDataURL("image/png");
    }

    const imageData = [];
    for (const img of imgs) {
      const dataURL = await imgToDataURL(img);
      imageData.push({ dataURL, w: img.naturalWidth, h: img.naturalHeight });
    }

    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: "IMAGES_DATA",
      data: imageData
    }));
  })(); 
  true;
`;
const INJECTED_JAVASCRIPT_AUTO_SCROLL_TO_END = `(function() {
    let scrolling = false;

    // Hàm giả lập touch + click cực mạnh để ép Google render
    function fireTouchAndClick(el) {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const touch = new Touch({
            identifier: Date.now(),
            target: el,
            clientX: x,
            clientY: y,
            radiusX: 10,
            radiusY: 10,
            force: 1
        });

        el.dispatchEvent(new TouchEvent('touchstart', { touches: [touch], bubbles: true, cancelable: true }));
        el.dispatchEvent(new MouseEvent('mousedown', { clientX: x, clientY: y, bubbles: true }));
        el.dispatchEvent(new MouseEvent('click', { clientX: x, clientY: y, bubbles: true }));
        setTimeout(() => {
            el.dispatchEvent(new TouchEvent('touchend', { changedTouches: [touch], bubbles: true }));
            el.dispatchEvent(new MouseEvent('mouseup', { clientX: x, clientY: y, bubbles: true }));
        }, 80);
    }

    // Scroll xuống cuối cùng và lặp lại cho đến khi không còn trang mới nào được render
    function startAutoScrollLoop() {
        if (scrolling) return;
        scrolling = true;

        const wrapper = document.querySelector('div[role="document"]');
        if (!wrapper) {
            setTimeout(startAutoScrollLoop, 2000);
            return;
        }

        let lastPageCount = 0;
        let stableCount = 0;
        const MAX_STABLE = 8; // nếu 8 lần liên tiếp không tăng trang → coi như đã hết

        const scrollStep = () => {
            // Lấy danh sách tất cả các trang hiện tại
            const pages = wrapper.querySelectorAll('div.ndfHFb-c4YZDc-cYSp0e-DARUcf[style*="padding-bottom"]');
            const currentCount = pages.length;

            if (currentCount === lastPageCount) {
                stableCount++;
            } else {
                stableCount = 0; // có trang mới → reset đếm
                lastPageCount = currentCount;
            }

            // Nếu đã ổn định quá lâu → dừng
            if (stableCount >= MAX_STABLE) {
                scrolling = false;
                // Tùy chọn: thông báo về React Native
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'PDF_LOADED', pages: currentCount }));
                }
                return;
            }

            // Click + touch vào 3 trang cuối cùng để ép render trang tiếp theo
            const lastFew = Array.from(pages).slice(-3);
            lastFew.forEach((page, i) => {
                setTimeout(() => fireTouchAndClick(page), i * 150);
            });

            // Scroll xuống đáy thật mạnh
            window.scrollTo(0, document.body.scrollHeight);

            // Backup: scroll từng trang cuối cùng vào giữa màn hình
            if (pages.length > 0) {
                const lastPage = pages[pages.length - 1];
                lastPage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Lặp lại sau 800–1200ms (đủ thời gian Google render)
            setTimeout(scrollStep, 900 + Math.random() * 400);
        };

        // Bắt đầu vòng lặp
        scrollStep();
    }

    // === CHẠY KHI DOM SẴN SÀNG ===
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(startAutoScrollLoop, 3000));
    } else {
        setTimeout(startAutoScrollLoop, 3000);
    }

    // Fallback chắc chắn chạy
    setTimeout(startAutoScrollLoop, 8000);
})(); true;`;
export function ExtensionHandle() {
  const { Sizes } = useAppSize();
  const { control, setValue } = useFormContext<TExtensionFormValues>();

  const cRef = useRef<TExtensionHandleRef>({
    loaded: {},
    fileName: {},
    retryCount: 0,
    lastUrl: '',
    injectedJSTimeout: undefined,
  });
  const webViewRef = useRef<WebView>(null);
  const url = useWatch({ control, exact: true, name: 'url' });
  const status = useWatch({ control, exact: true, name: 'status' });

  useEffect(() => {
    if (status !== 'loading_url') {
      return;
    }
    cRef.current.retryCount = 0;
    //if url not loaded
    if (!cRef.current.loaded[url]) {
      return;
    }
    //if url is not last url
    if (url !== cRef.current.lastUrl) {
      cRef.current.lastUrl = url;
      delete cRef.current.loaded[url];
      return;
    }
    //incase url is loaded and user click create pdf on last url
    //inject js create pdf if url is loaded
    handleInjectJS();
  }, [status]);

  useEffect(() => {
    if (!url) {
      cRef.current.lastUrl = '';
      cRef.current.loaded = {};
      cRef.current.fileName = {};
      cRef.current.retryCount = 0;
      return;
    }
  }, [url]);

  const handleInjectJS = () => {
    if (cRef.current.retryCount > 5) {
      setValue('status', 'error');
      return;
    }
    cRef.current.retryCount++;
    if (cRef.current.retryCount < 3) {
      webViewRef.current?.injectJavaScript(injectedJSCreatePDF);
      return;
    }
    webViewRef.current?.injectJavaScript(injectedJSCreatePDFByCanvas);
  };

  const moveFileToDocument = async (
    cachedFilePath: string,
    filename = 'myPDF.pdf',
  ) => {
    try {
      if (Platform.OS === 'android') {
        const result = await RNBlobUtil.MediaCollection.copyToMediaStore(
          {
            name: filename,
            mimeType: 'application/pdf',
            parentFolder: 'NihonTechHub', // sẽ hiện trong thư mục Download/NihonTechHub
          },
          'Download', // truyền path trực tiếp
          cachedFilePath,
        );
        console.log('Saved file path:', result);

        return result;
      }
      //ios
      const dirs = RNBlobUtil.fs.dirs;
      const destPath = `${dirs.DocumentDir}/${filename}`;
      if (await RNBlobUtil.fs.exists(destPath)) {
        await RNBlobUtil.fs.unlink(destPath);
      }
      await RNBlobUtil.fs.cp(cachedFilePath, destPath);
      return destPath;
    } catch (err) {
      console.error(err);

      return null;
    }
  };
  const handleCreatePDF = async (images: Array<{ dataURL: string }>) => {
    setValue('status', 'creating_pdf');
    const imagePaths = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const base64Data = img.dataURL.split(',')[1]; // loại bỏ "data:image/png;base64,"

      // Tạo file tạm bằng react-native-blob-util
      const path = `${RNBlobUtil.fs.dirs.CacheDir}/img_${i}.png`;

      await RNBlobUtil.fs.writeFile(path, base64Data, 'base64');
      imagePaths.push(path);
    }

    const title = cRef.current.fileName[url];
    console.log('title', title);
    const name = `${extractFileName(title) ?? 'document'}.pdf`;
    const { filePath } = await createPdf({
      imagePaths,
      name,
    });
    if (!filePath) {
      setValue('status', 'error');
      return;
    }
    const dest = await moveFileToDocument(filePath, name);
    if (!dest) {
      setValue('status', 'error');
      return;
    }
    setValue('file', {
      name,
      page: imagePaths.length,
      url: dest,
      androidTmpFilePath: filePath,
    });
    setValue('status', 'done');
  };

  const onMessage = (event: any) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      console.log('onMessage', msg);

      if (msg.type === 'PDF_LOADED') {
        handleInjectJS();
        return;
      }
      if (msg.type === 'IMAGES_DATA') {
        handleCreatePDF(msg.data);
        return;
      }
      if (msg.type === 'IMAGE_ERROR') {
        console.warn(msg.message);

        if (msg.message === 'No blob images found') {
          setTimeout(() => {
            handleInjectJS();
          }, 1000);
          return;
        }
        setValue('status', 'error');
        return;
      }
    } catch {
      setValue('status', 'error');
    }
  };

  const handleLoadEnd: WebViewProps['onLoadEnd'] = event => {
    if (!event.nativeEvent.url) {
      setValue('status', 'error');
      cRef.current.loaded[event.nativeEvent.url] = false;
      return;
    }
    if (cRef.current.loaded[event.nativeEvent.url]) {
      return;
    }
    cRef.current.loaded[event.nativeEvent.url] = true;
    cRef.current.fileName[event.nativeEvent.url] = event.nativeEvent.title;
  };

  const onContentProcessDidTerminate = () => {
    setValue('status', 'error');
  };

  if (status === 'init' || status === 'error' || !url) {
    return null;
  }

  return (
    <AppWeb
      key={url}
      webRef={webViewRef}
      style={{
        width: Sizes.device_width,
        position: 'absolute',
        height: 500,
        opacity: 0,
      }}
      source={{
        uri: url,
      }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      scalesPageToFit={false}
      scrollEnabled={true}
      allowsBackForwardNavigationGestures={false}
      injectedJavaScript={INJECTED_JAVASCRIPT_AUTO_SCROLL_TO_END}
      onMessage={onMessage}
      onContentProcessDidTerminate={onContentProcessDidTerminate}
      onRenderProcessGone={onContentProcessDidTerminate}
      onLoadEnd={handleLoadEnd}
      bounces={false}
      overScrollMode="never"
      cacheEnabled
      nestedScrollEnabled
      webviewDebuggingEnabled
    />
  );
}
