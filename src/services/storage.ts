interface ITokens {
  access: string;
  refresh?: string;
}

export const loadToken = (): string | null => {
  const tokens: any = localStorage.getItem("tokens");
  if (!tokens) return null;
  const { access } = JSON.parse(tokens) as ITokens;
  return access;
};

export const loadRefreshToken = (): string | null | undefined => {
  const tokens: any = localStorage.getItem("tokens");
  const { refresh } = JSON.parse(tokens) as ITokens;
  return refresh;
};

export const saveTokens = ({ access, refresh }: ITokens) => {
  const tokens = JSON.stringify({
    access,
    refresh,
  });
  localStorage.setItem("tokens", tokens);
};
