import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export const Landing = () => {
  return (
    <div className="flex-col space-y-10 pt-6">
      <LoginForm />
      <div>
        <SignUpForm />
      </div>
      <div>Maybe have a how-to-video embeded</div>
    </div>
  );
};
