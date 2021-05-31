import SignIn from "../../components/auth/signin";
import { getSession } from "next-auth/client";

const SiginPage = () => {
  return <SignIn />;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default SiginPage;
