export const UploadFileHelper = {
  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  },

  setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((acc, key) => (acc[key] ??= {}), obj);
    if (lastKey) target[lastKey] = value;
  },

  convertFileToUrl: (file: string) => {
    return `${process.env.DOMAIN}:${process.env.MINIO_PORT}/${file}`;
  },

  convertArrFileToUrl: (arr: string[]) => {
    return arr.map(
      (i) => `${process.env.DOMAIN}:${process.env.MINIO_PORT}/${i}`,
    );
  },

  /**
   *
   * @Usage: Using for convert correct url file and return to client
   * @Syntax:
   *    UploadFileHelper.convertObjFileToUrl(data, [
            'field1',
            'field2',
            'field3',
        ])
      @Usage:
   *    UploadFileHelper.convertObjFileToUrl(data, [
          'avatars',
          'images',
          'videos',
        ])
   * @returns
   */

  convertObjFileToUrl: (object: Record<string, any>, keys: string[]) => {
    const result = JSON.parse(JSON.stringify(object)); // deep clone

    for (const key of keys) {
      const value = UploadFileHelper.getNestedValue(result, key);

      if (!value) continue; // skip if value is null or undefined

      if (typeof value === 'string') {
        UploadFileHelper.setNestedValue(
          result,
          key,
          UploadFileHelper.convertFileToUrl(value),
        );
      }

      if (Array.isArray(value)) {
        UploadFileHelper.setNestedValue(
          result,
          key,
          UploadFileHelper.convertArrFileToUrl(value),
        );
      }
    }

    return result;
  },
};
