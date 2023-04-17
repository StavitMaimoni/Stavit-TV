import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import stavitLogo from "../assets/images/stavit-logo.png";
import background from "../assets/images/netflix-background.jpg";

interface Inputs {
    email: string;
    password: string;
}

function Login() {
    const [login, setLogin] = useState(false);
    const { signIn, signUp } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (login) {
            await signIn(data.email, data.password);
        } else {
            await signUp(data.email, data.password);
        }
    }

    return (
        <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center">
            <Head>
                <title>Stavit-TV</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image
                src={background}
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 bottom-0 right-0 z-0"
            />
            <div className="absolute left-2 top-1 h-20 w-44 cursor-pointer md:left-8 md:top-4">
                <Image
                    src={stavitLogo}
                    width={120}
                    height={50}
                    className="cursor-pointer object-contain"
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            <form
                className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className="space-y-4">
                    <label className="inline-block w-full">
                        <input
                            type="email"
                            placeholder="Email"
                            className={`input ${errors.email && 'border-b-2 border-orange-500'
                                }`}
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Please enter a valid email.
                            </p>
                        )}
                    </label>
                    <label className="inline-block w-full">
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            placeholder="Password"
                            className={`input ${errors.password && 'border-b-2 border-orange-500'
                                }`}
                        />
                        {errors.password && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Your password must contain between 4 and 60 characters.
                            </p>
                        )}
                    </label>
                </div>
                <button
                    className="w-full rounded bg-[#E50914] py-3 font-semibold"
                    onClick={() => setLogin(true)}
                    type="submit"
                >
                    Sign In
                </button>
                <div className="text-[gray]">
                    New to Stavit-TV?{' '}
                    <button
                        className="cursor-pointer text-white hover:underline"
                        onClick={() => setLogin(false)}
                        type="submit"
                    >
                        Sign up now
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login;
