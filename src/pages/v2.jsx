const VerificationUser = () => {
  const local = localStorage.getItem("authUser")
  
  return (
    <div>
      Dados do local storage{local}
    </div>
  );
};

export default VerificationUser;
