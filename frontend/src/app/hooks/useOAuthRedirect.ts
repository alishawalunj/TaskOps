'use client';

import { useQuery } from '@apollo/client/react';
import { GET_GOOGLE_REDIRECT_URL, GET_GITHUB_REDIRECT_URL } from "../graphql/queries";
import { OAuthRedirectUrlResponse } from "../graphql/types";
import { useState, useEffect } from "react";

interface GetGoogleRedirectData {
  getGoogleRedirectUrl: OAuthRedirectUrlResponse;
}

interface GetGithubRedirectData {
  getGithubRedirectUrl: OAuthRedirectUrlResponse;
}

export function useOAuthRedirect() {
  const [fetchGoogleNow, setFetchGoogleNow] = useState(false);
  const [fetchGithubNow, setFetchGithubNow] = useState(false);

  const { data: googleData } = useQuery<GetGoogleRedirectData>(
    GET_GOOGLE_REDIRECT_URL,
    { skip: !fetchGoogleNow, fetchPolicy: "network-only" }
  );

  const { data: githubData } = useQuery<GetGithubRedirectData>(
    GET_GITHUB_REDIRECT_URL,
    { skip: !fetchGithubNow, fetchPolicy: "network-only" }
  );

  useEffect(() => {
    if (googleData?.getGoogleRedirectUrl?.url) {
      window.location.href = googleData.getGoogleRedirectUrl.url;
    }
  }, [googleData]);

  useEffect(() => {
    if (githubData?.getGithubRedirectUrl?.url) {
      window.location.href = githubData.getGithubRedirectUrl.url;
    }
  }, [githubData]);

  const googleLogin = () => setFetchGoogleNow(true);
  const githubLogin = () => setFetchGithubNow(true);

  return { googleLogin, githubLogin };
}
