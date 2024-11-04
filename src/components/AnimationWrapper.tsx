import { useState, useEffect } from "react"
import Animation from "@components/Animation"
import { wrapperStrings } from "@i18n/ui"
import { defaultLang } from "@i18n/ui"

const AnimationWrapper = ({ locale, ...props }: any) => {
  const [animate, setAnimate] = useState(false)
  const [qual, setQual] = useState("low")
  const [render, setRender] = useState(false)

  const resetQual = (qual: string) => {
    setRender(true)
    setAnimate(false)
    setQual(qual)
  }

  useEffect(() => {
    if (render) { setAnimate(true) }
  }, [qual]);

  if (animate === false) {
    return (
      <>
        <div className="absolute top-0 -z-20 w-[100%] overflow-hidden mx-auto bg-gradient-to-r from-black via-yellow-300 to-teal-500 blur animate-pulse h-[calc(60vh+6px)] rounded-bl-[30vh] rounded-br-[100%]">
        </div>

        <div className="flex w-[100%] overflow-hidden mx-auto justify-center items-center bg-transparent dark:border-b dark:border-gray-300 h-[60vh] rounded-bl-[30vh] rounded-br-[100%]">
          <div className="w-full text-center bg-transparent text-white">
            <p className=""><button onClick={() => setAnimate(true)} className="border border-white border-dotted px-2">{wrapperStrings.w1[locale]}</button></p>
            <p className="text-2sm">{wrapperStrings.w2[locale]}</p>
          </div>
        </div>

        <div id="simple"
          className="absolute top-0 flex items-center justify-center -z-20 w-[100%] overflow-hidden mx-auto bg-[#101f33] dark:bg-black h-[60vh] rounded-bl-[30vh] rounded-br-[100%]">
          <span className="quad w-full h-[150vh] rounded-full animate-appear"></span>
          <span className="first w-[15vw] h-[15vw] animate-rotate bg-teal-300"></span>
        </div>
      </>
    )

  } else {
    return (
      <>
        <div className="absolute top-0 -z-10 w-[100%] h-[calc(60vh+6px)] overflow-hidden mx-auto rounded-bl-[30vh] rounded-br-[100%] bg-gradient-to-r from-black via-yellow-300 to-teal-500 blur animate-pulse">
        </div>

        <div id="simple"
          className="absolute top-0 flex items-center justify-center -z-10 w-[100%] overflow-hidden mx-auto h-[60vh] bg-[#101f33] dark:bg-black rounded-bl-[30vh] rounded-br-[100%]" >
          <span className="quad w-full h-[150vh] rounded-full animate-appear"></span>
        </div>

        <div className="flex w-[100%] overflow-hidden mx-auto h-[60vh] rounded-bl-[30vh] rounded-br-[100%] ">
          <Animation client:load canvasWidth="100%" canvasHeight="100%" qual={qual} visualisation="bluemarble" />
        </div>

        <p className="absolute mr-2 top-[6em] right-2 text-2sm text-white">
          {[wrapperStrings.low, wrapperStrings.mid, wrapperStrings.high].map(q => { return (<button onClick={() => { resetQual(q[defaultLang]) }} className={"border border-dotted px-2 hover:bg-yellow-200 " + ((q[defaultLang] === qual) ? "active" : "")}>{q[locale].toUpperCase()} DEF</button>) })}
        </p>
      </>
    )
  }
}

export default AnimationWrapper