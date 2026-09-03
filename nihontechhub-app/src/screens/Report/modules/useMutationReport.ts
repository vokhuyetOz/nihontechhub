import { useMutation } from '@tanstack/react-query';
import { useAppLanguage } from '@utils/modules';
import { ReportAPI } from '@utils/modules/FetchApi/Report/ReportAPI';
import { notify } from 'react-native-notificated';
import { setReportSelectedFeed } from './useReportSelectedFeed';

export const useMutationReport = () => {
  const { Strings } = useAppLanguage();
  return useMutation({
    mutationFn: ReportAPI.post,
    throwOnError: false,
    onError: error => {
      notify('error', {
        params: {
          title: error?.message ?? Strings.Report_failed,
        },
      });
    },
    onSuccess: data => {
      setReportSelectedFeed();
    },
  });
};
