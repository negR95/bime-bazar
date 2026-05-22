import type { AxiosError } from "axios";
import React from "react";

export const useQuery = <TRequest extends unknown[], TResponse>(
  fn: (...args: TRequest) => Promise<TResponse>,
  ...req: TRequest
) => {
  const [data, setData] = React.useState<TResponse>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<AxiosError | Error | unknown>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: no need to request every component update!
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(undefined);
        const data = await fn(...req);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [fn, JSON.stringify(req)]);

  return { data, loading, error };
};

export const useMutation = <TRequest extends unknown[], TResponse>(
  fn: (...args: TRequest) => Promise<TResponse>,
) => {
  const [data, setData] = React.useState<TResponse>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<AxiosError | Error | unknown>();

  const mutate = async (...args: TRequest) => {
    try {
      setLoading(true);
      setError(undefined);
      const responseData = await fn(...args);
      setData(responseData);
      return responseData;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
};
