export interface FetchResponseWrapper<T> {}
export function unwrapErrors(
  errorObject: Record<string, string[]>,
): {title: string; description: string}[] {
  console.log('Unwrapping errors...');
  console.log(errorObject);
  const unwrappedErrors = [];

  for (const key in errorObject) {
    console.log('Key', key);
    console.log('error', errorObject[key]);
    const title = key;
    const description = errorObject[key][0]; // Assuming the first element is the description

    unwrappedErrors.push({title, description});
  }

  console.log(unwrappedErrors);

  return unwrappedErrors;
}

export function objectToFormData(obj: any) {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData;
}

export function logFormData(formData: FormData) {
  console.log('Logging formdata...');
  if (formData && formData.values()) {
    for (let value of formData.values()) {
      console.log(value);
    }
  } else {
    console.log('Formdata is undefined');
  }
}

export function objectToHeaders(obj: any) {
  const headers = new Headers();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      headers.append(key, obj[key]);
    }
  }
  return headers;
}

export async function fetchJson<T>(
  url: string,
  options: FetchWrapperOptions = {
    excludeAuthHeader: false,
  },
): Promise<T> {
  const token = null;
  const headers_ =
    options.excludeAuthHeader === false
      ? objectToHeaders({
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        })
      : new Headers();
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers_,
    });
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    console.error('URL:', url);
    throw error;
  }
}

export async function postJson<T>(
  url: string,
  dataObject: Record<string, any>,
  options: FetchWrapperOptions = {
    excludeAuthHeader: false,
  },
): Promise<FetchResponseWrapper<T>> {
  const token = null;
  const headers_ =
    options.excludeAuthHeader === false
      ? objectToHeaders({
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        })
      : new Headers({
          'content-type': 'application/json',
        });

  const body = JSON.stringify(dataObject);

  console.log(body);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers_,
      body,
    });
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function postFormData<T>(
  url: string,
  dataObject: Record<string, any>,
  options: FetchWrapperOptions = {
    excludeAuthHeader: false,
  },
): Promise<FetchResponseWrapper<T>> {
  const formData = objectToFormData(dataObject);

  const token = null;
  const headers_ = options?.excludeAuthHeader
    ? new Headers()
    : objectToHeaders({
        Authorization: `Bearer ${token}`,
      });
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: headers_,
    });
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchJsonWithParams<T>(
  url: string,
  params: {[key: string]: string | number | null | undefined},
  options: FetchWrapperOptions = {
    excludeAuthHeader: false,
  },
): Promise<T> {
  const filteredParams = Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .reduce<{[key: string]: string}>((acc, [key, value]) => {
      acc[key] = value as string;
      return acc;
    }, {});

  const searchParams = new URLSearchParams(filteredParams).toString();
  const fullUrl = searchParams ? `${url}?${searchParams}` : url;

  const token = null;
  const headers_ =
    options?.excludeAuthHeader === false
      ? objectToHeaders({
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        })
      : new Headers({
          'content-type': 'application/json',
        });
  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers_,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    console.error('URL:', url);
    throw error;
  }
}

interface FetchWrapperOptions {
  excludeAuthHeader: boolean;
}
