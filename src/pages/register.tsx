import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ToastWarning from '../components/toast/warning';
import ToastSuccess from '../components/toast/success';
import { useState } from 'react';
import { RegisterAPI } from '../api/register';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [messageToastWarning, setMessageToastWarning] = useState("");
  const [messageToastSuccess, setMessageToastSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await RegisterAPI(data);
      setMessageToastSuccess("Pendaftaran Sukses");
      setTimeout(() => {
        setMessageToastSuccess("");
        navigate('/login');
      }, 2000);

    } catch (error) {
      setMessageToastWarning("Pendaftaran Gagal");
        setTimeout(() => {
          setMessageToastWarning("");
        }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src="https://dti.itb.ac.id/wp-content/uploads/2020/09/logo_itb_1024.png" className="w-32 mx-auto" alt="Logo" />
          </div>
          <div className="mt-6 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Daftar</h1>
            <div className="w-full flex-1 mt-4">
              <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xs">
                <input {...register('name')} className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" type="text" placeholder="Nama" />
                {errors.password && <p className="text-red-500 text-xs mt-1">Nama wajib diisi</p>}
                <input {...register('email')} className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" type="email" placeholder="Email" />
                {errors.pohone_number && <p className="text-red-500 text-xs mt-1">Email wajib diisi</p>}
                <input {...register('password')} className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" type="password" placeholder="Password" />
                {errors.password && <p className="text-red-500 text-xs mt-1">Password wajib diisi</p>}
                <button disabled={loading} type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">{loading ? "loading..." : "Daftar"}</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Dengan mendaftar, saya setuju dengan ketentuan dan kebijakan privasi yang berlaku.
                </p>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Sudah punya akun? Masuk <a href="/login" className="border-b border-gray-500 border-dotted">
                    disini
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}>
          </div>
        </div>
      </div>
      {messageToastWarning != "" && <ToastWarning message={messageToastWarning} />}
      {messageToastSuccess != "" && <ToastSuccess message={messageToastSuccess} />}
    </div>
  );
};

export default Register;
