import * as bootstrap from 'bootstrap'
import React, { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import {LocationComponent} from "./mainComponent.js"
import {BrowserRouter,Routes,Route} from 'react-router'

const rootElement=createRoot(document.querySelector("main"))
rootElement.render(
    <>
        <LocationComponent/>
    </>
)
 