 class AuthService{

    setToken(token)
    {
        localStorage.setItem('token',token);
    }

    getToken(token)
    {
       return  localStorage.getItem('token');
    }

    removeToken() {
       
        localStorage.removeItem('token');
       

      }

 }

 const obj=new AuthService();

 export default obj;
