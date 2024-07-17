import './registration.scss'

const Singup = () => {

    return ( 
        <>
            <div className="signup-form">
                <div className="signup-form_wrapper">
                    <form action="">
                        <div className="form-group">
                            <input 
                                type="text" 
                                placeholder="Enter Name"
                            />
                            <input 
                                type="email" 
                                name="Enter Email" 
                                id="" 
                                placeholder="Enter email"
                            />
                            <input 
                                type="passowrd" 
                                name="Enter password" 
                                id="" 
                                placeholder="Enter password"
                            />
                            <button>Sign In</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </> 
    );
}
 
export default Singup;