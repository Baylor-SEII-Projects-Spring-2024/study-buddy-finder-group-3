import React from "react"
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CreateAccount from "@/components/CreateAccount";

function createAccount() {
  return (
      <>
        <CreateAccount open={true} onClose={() => {}} /> {}
      </>
  );
}

export default createAccount
