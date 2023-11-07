const API_HOST = process.env.API_HOST || process.env.NEXT_PUBLIC_API_HOST;

function getDefaultHeader(token?: string) {
  const header: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    header["Authorization"] = `Bearer ${token}`;
  }

  return header;
}

export async function GET({
  url,
  headers,
  params,
  token,
}: {
  url: string;
  headers?: any;
  params?: any;
  token?: string;
}) {
  return await fetch(`${API_HOST}${url}`, {
    method: "GET",
    headers: { ...getDefaultHeader(token), ...(headers ? headers : {}) },
  });
}

export async function POST({
  url,
  headers,
  params,
  token,
}: {
  url: string;
  headers?: any;
  params?: any;
  token?: string;
}) {
  return await fetch(`${API_HOST}${url}`, {
    method: "POST",
    headers: { ...getDefaultHeader(token), ...(headers ? headers : {}) },
    body: params ? JSON.stringify(params) : null,
  });
}
