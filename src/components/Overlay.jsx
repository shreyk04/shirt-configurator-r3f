import { useSnapshot } from "valtio";
import Customizer from "./Customizer";
import Intro from "./Intro";
import { state } from "../store";
import { Logo } from "@pmndrs/branding";
import { AiOutlineShopping } from "react-icons/ai";
import { motion } from "motion/react"
import { animate, AnimatePresence } from "framer-motion";



export default function Overlay() {


    const transition={type:'spring',duration:0.8}

    const config={
        initial:{x:-100,opacity:0,transition:{...transition,delay:0.5}},
        animate:{x:0,opacity:1,transition:{...transition,delay:0}},
        exit:{x:-100,opacity:0,transition:{...transition,delay:0}}

    }

    const snap = useSnapshot(state)
    return (
        <div className="container">
            <motion.header initial={{opacity:0,y:-120}}
             animate={{opacity:1,y:0}}
             transition={{type:'spring',duration:1.0,delay:1}}
            >

                <Logo width='40' height='40' />
                <AiOutlineShopping size='3em' />
            </motion.header>

            <AnimatePresence>

            {

                snap.intro ? <Intro key='main' config={config}/> : <Customizer key='custom' config={config}/>
            }
            </AnimatePresence>
        </div>

    )
}