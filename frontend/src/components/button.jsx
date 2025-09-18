export default function Button({style,text,fn}){
    return(
        <button 
        className={`${style} w-fit p-3 rounded-2xl cursor-pointer items-center`}
        onClick={fn}>{text}</button>
    )
}