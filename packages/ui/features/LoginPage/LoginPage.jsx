import React, { useState, useEffect } from 'react';
import {
  Form,
  FormIntegratedLabelTextInput,
  FormSubmitButton,
  IconLoadingCircles,
  useRouter,
} from '@billyjb3/global-react';
import { useAuthContext } from '@nexus-bb3/core';
import { ButtonText } from '../../components';
import './styles.scss';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { createAccount, login, isAuthenticated } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated) push('/nexus');
  }, [isAuthenticated]);

  const handleSubmit = (formData) => {
    setIsLoading(true);

    const { username, password } = formData;
    if (isSignUp) {
      createAccount(username, password)
        .then(({ user }) => {
          // push('/nexus');
        })
        .catch(({ errorCode, errorMessage }) => {
          console.log(errorMessage);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      login(username, password)
        .then(({ user }) => {
          // push('/nexus');
        })
        .catch(({ errorCode, errorMessage }) => {
          console.log(errorMessage);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <div className="color-bg-primary color-text-primary height-page flex flex-justify-center flex-align-center">
      <div className="loginBox border-1 border-radius-md color-border-primary pad-3">
        <div className="heading-3 pad-3-b">{isSignUp ? 'Create Account' : 'Login'}</div>
        <Form
          onSubmit={handleSubmit}
        >
          <FormIntegratedLabelTextInput
            id="usernameInput"
            requestKey="username"
            label="Username"
            isRequired={true}
            containerClass="pad-3-b"
            inputClass="border-1 border-radius-sm color-border-primary color-text-primary barlow body-small condensed"
            labelClass="body-small color-text-accent"
            activeLabelClass="sub-text color-text-accent color-bg-primary"
          />
          <FormIntegratedLabelTextInput
            id="passwordInput"
            requestKey="password"
            label="Password"
            isRequired={true}
            containerClass="pad-3-b"
            inputClass="border-1 border-radius-sm color-border-primary color-text-primary barlow body-small condensed"
            labelClass="body-small color-text-accent"
            activeLabelClass="sub-text color-text-accent color-bg-primary"
          />
          <FormSubmitButton className='button-primary body-bold'>
            {isLoading ? <IconLoadingCircles /> : 'Submit' }
          </FormSubmitButton>
          {isError && (
            <div className="color-text-error body-small pad-1-tb">
              {isSignUp ? 'Account creation failed, please try again later.' : 'Login failed.'}
            </div>
          )}
        </Form>
        <div className="pad-3-t">
          <ButtonText
            className="color-text-primary"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Login' : 'Create Account'}
          </ButtonText>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
