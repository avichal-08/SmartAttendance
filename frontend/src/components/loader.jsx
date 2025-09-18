import { motion } from "motion/react"
export default function Loader(){
    return(
        <div className="flex gap-2 mt-[20%] ml-[45%] absolute">
            <motion.div 
            initial={{
                y:0,
            }}
            animate={{
                y:[0,20,0],
            }}
            transition={{
                duration:1,
                repeat:Infinity,
                repeatType:"loop"
            }} 
            className="bg-blue-600 rounded-full h-10 w-10"></motion.div>
            <motion.div
            initial={{
                y:0
            }}
            animate={{
                y:[0,20,0]
            }}
            transition={{
                duration:1,
                delay:0.1,
                repeat:Infinity,
                repeatType:"loop"
            }}
            className="bg-blue-600 rounded-full h-10 w-10"></motion.div>
            <motion.div
            initial={{
                y:0
            }}
            animate={{
                y:[0,20,0]
            }}
            transition={{
                duration:1,
                delay:0.2,
                repeat:Infinity,
                repeatType:"loop"
            }} 
            className="bg-blue-600 rounded-full h-10 w-10"></motion.div>
        </div>
    )
}
