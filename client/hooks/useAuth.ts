import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuth = (user: any) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login"); 
    }
  }, [user, router]);
};

export default useAuth;
