import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useAuthentication } from "../hooks/user-authenticate";
import { Button } from "primereact/button";


export const Login = () => {
  const { formValues, handleChangeValues, submit } = useAuthentication();

  const isLoginFormValid =
    formValues.login !== "" && formValues.password !== "";

  const inputStyle =
    "block w-full rounded-md border-0 py-4 px-5 text-gray-900 shadow-sm  placeholder:text-gray-700 text-md sm:leading-6";

  return (
    <Fragment>
      <div className="flex flex-row gap-5 bg-[#141515]">
        <section className="w-[100%] flex items-center justify-center h-screen ">
          <section className="w-[450px] flex flex-column items-center justify-center z-10">
            <form className="min-h-[450px]" method="post">
              <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="mb-16 text-center text-4xl font-bold uppercase leading-9 tracking-widest text-white">
                  RELATORY
                </h2>
              </div>

              <div className="w-[24rem] ">
                <InputText
                  id="login"
                  name="login"
                  onChange={handleChangeValues}
                  type="email"
                  autocomplete="login"
                  className={`${inputStyle} bg-white`}
                  placeholder="Informe seu e-mail"
                  required
                  label="E-mail"
                />
              </div>

              <div  className="w-[24rem]">
                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <Link
                      to="/esqueci-senha"
                      className="font-semibold text-white hover:text-indigo-500"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                </div>
                <InputText
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChangeValues}
                  autocomplete="current-password"
                  className={`${inputStyle} bg-white`}
                  placeholder="Informe sua senha"
                  required
                  label="Senha"
                />
              </div>

              <div className="w-[24rem] pt-5">
                <Button
                  type="submit"
                  className={`flex w-full justify-center rounded-md bg-[#04b200] px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm 
                                        ${
                                          !isLoginFormValid
                                            ? "brightness-50 cursor-not-allowed"
                                            : "brightness-100"
                                        }
                                        transition ease-in-out duration-500`}
                  disabled={!isLoginFormValid}
                  label="Entrar"
                  onClick={submit}
                />
              </div>
            </form>
          </section>
        </section>
      </div>
    </Fragment>
  );
};
