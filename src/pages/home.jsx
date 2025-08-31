import { NavLink, Outlet } from 'react-router'
import { Button } from './ui/button'

const Home = () => {
    return (
        <>
            <div className='flex flex-col gap-10 items-center justify-center'>
                <div className='text-4xl font-semibold border-2 shadow-2xl'>Text Page</div>
                <div className='flex flex-row gap-3'>
                    <Button >
                        <NavLink to='auth/login'>Login</NavLink>
                    </Button>
                    <Button>
                        <NavLink to='auth/register'>Register</NavLink>
                    </Button>
                    <Button>
                        <NavLink to='/'>Back</NavLink>
                    </Button>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Home