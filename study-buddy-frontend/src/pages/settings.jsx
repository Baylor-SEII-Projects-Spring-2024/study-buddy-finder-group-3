import React from "react"
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SettingsMain from "@/components/SettingsMain";

function settings() {
  return (
      <>
          <Header/>

          <div style={{ display: 'flex' }}>
              <Sidebar/>
              <SettingsMain/>
          </div>

      </>
  )
}

export default settings
