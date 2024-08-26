"use client";

import InteractiveSliders from "@/components/GameSlideEffects";
import RegistrationForm from "@/components/RegistrationForm";

const registerForm = () => {
  return (
    <section className="w-full px-8 py-16 bg-gray-100 xl:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full space-y-5 md:w-3/5 md:pr-16">
            <InteractiveSliders />
          </div>

          <div className="w-full mt-16 md:mt-0 md:w-2/5">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default registerForm;
