import { useState } from "react";

export const ResumeModal = (props) => {
    const password = "@zarshig@"
    const [inputPassword, handleInput] = useState();
    function submitPassword(e) {
        e.preventDefault();
        password == inputPassword ?
            window.location.replace("https://www.azarshiga.ir/wp-content/uploads/2021/10/resume.pdf")
            : alert("Incorrect password")
    }
    // function handleInput(e) {

    // }
    return (<>
        <div class="mt-0 fixed z-50 inset-0 overflow-y-auto w-full" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex justify-center min-h-screen  text-center sm:block sm:p-0">

                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-4">
                    <form onSubmit={e => { submitPassword(e) }}>
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                            <div class="sm:flex sm:items-start">

                                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Password Protected
                                    </h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">
                                            This file is secured by password. If you don't have it, contact us to provide you.
                                        </p>
                                    </div>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">
                                            <label for="password">
                                                {/* Enter Password: */}
                                            </label>
                                            <input name="password" type="text" placeholder="password" value={inputPassword} onChange={e => handleInput(e.target.value)}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            ></input>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <button type="submit" className="flex-1  bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-base px-12 py-2 mr-2 ml-2 rounded shadow-md hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                                Download
                            </button>
                            <button onClick={props.close} type="button" class="flex-1 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}
export default ResumeModal;