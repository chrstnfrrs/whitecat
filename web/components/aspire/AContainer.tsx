interface IAContainer {
  className?: string
}

const AContainer: React.FC<IAContainer> = (props) => (
  <div className={`${props.className} flex flex-col py-16 px-32`}>
    {props.children}
  </div>
)

export default AContainer