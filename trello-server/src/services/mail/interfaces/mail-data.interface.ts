export interface MailData<T = never> {
  to: string | undefined;
  data: T;
}