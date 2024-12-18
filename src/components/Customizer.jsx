import { AiFillCamera, AiOutlineArrowLeft } from "react-icons/ai"
import { div } from "three/webgpu"
import { state } from "../store"
import { useSnapshot } from "valtio"
import { motion } from "motion/react"


const Customizer = ({config}) => {
    const colors = ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934']
    const decals = ['react', 'threejs', 'pmndrs']
    const snap = useSnapshot(state)

    return (


        <motion.section {...config} key='custom'>
            <div className="customizer">
                <div className="color-options">
                    {
                        colors.map((color) => (
                            <div key={color} className="circle" style={{ background: color }} onClick={()=>(state.selectedColor=color)}></div>

                        ))
                    }
                </div>

                <div className="decals">
                    <div className="decals-container">
                        {
                            
                            snap.decals.map((decal) => (
                                <div className="decal" onClick={()=>(state.selectedDecal=decal)}>
                                    <img src={`./images/` + decal + '.png'} alt="" style={{width:"50px"}}/>
                                </div>  
                            ))
                        }
                    </div>
                </div>
                <button className="share" style={{ background: snap.selectedColor }}
                 onClick={()=>{

                    //to download image
                    const link=document.createElement('a')
                    link.setAttribute('download','canvas.png')
                    link.setAttribute('href',
                        document.querySelector('canvas').toDataURL('image/png').replace('image/png','image/octet-stream')
                    )
                    link.click()

                 }}
                >
                    DOWNLOAD
                    <AiFillCamera size="1.3em" />
                </button>
                <button className="exit" style={{ background: snap.selectedColor }} onClick={()=>{state.intro=true}}>
                    GO BACK
                    <AiOutlineArrowLeft size="1.3em" />
                </button>
            </div>
        </motion.section>

    )
}

export default Customizer
