import { Logo } from "@pmndrs/branding"
import { AiOutlineHighlight, AiOutlineShopping } from "react-icons/ai"
import { state } from "../store"
import { useSnapshot } from "valtio"
import { motion } from "motion/react"



const Intro=({config})=>{

    const snap=useSnapshot(state)
    return(
     

        <motion.section {...config} key='main'>
            <div className="section-container">
                <h1>Let's Do It</h1>
            </div>
            <div className="support-content">
                <div>
                    <p>Create your unique exclusive shirt with our brand-new customization tool.
                        <strong>Unleash your imagination</strong> and define your own style
                    </p>
                    <button onClick={()=>{state.intro=false}} style={{backgroundColor:snap.selectedColor}}>
                        Customize It <AiOutlineHighlight size='1.2em'/>
                    </button>
                </div>
            </div>
        </motion.section>
    )
}
export default Intro