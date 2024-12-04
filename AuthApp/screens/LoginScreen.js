import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { logIn } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating ] = useState(false);

  const authCtx = useContext(AuthContext);

  async function logInHandler({ email, password }) {
    setIsAuthenticating(true);
    try{
      const token = await logIn(email, password);
      authCtx.authenticate(token);
    } catch (error){
      Alert.alert('Authentication failed!', "Could not log-in");
      // important to keep this in the catch to get rid of rendering errors when switching login/welcome screens
      setIsAuthenticating(false);
    }

    // setIsAuthenticating(false); not here because an error will be thrown after screen changed and this is set
  }

  if(isAuthenticating){
    return <LoadingOverlay message='Logging in...' />
  }

  return <AuthContent isLogin onAuthenticate={logInHandler} />;
}

export default LoginScreen;
