import { validateAccessTokenAction } from '@/modules/actions';
import { TComponentChildrenProps } from '@/modules/types';
import { redirect } from 'next/navigation';

const LoginLayout = async ({ children }: TComponentChildrenProps) => {
  const isTokenValid = await validateAccessTokenAction();

  if (isTokenValid) redirect('/dashboard');

  return <>{children}</>;
};
export default LoginLayout;
