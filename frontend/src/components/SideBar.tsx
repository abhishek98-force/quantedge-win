
const SideBar = () => {
  return (
    <div className="fixed left-0 w-1/5 h-screen bg-slate-500">
      <div className="text-xl my-4 pl-2">
        Quantedge
      </div>
      <div className="pl-3">
      <nav className="list-none">
        <li>
            <ul>
                Home
            </ul>
            <ul>
                Technical Analysis
            </ul>
            <ul>
                Sentiment Analysis
            </ul>
            <ul>
                Fundamental Analysis
            </ul>
            <ul>
                Prompts 
            </ul>
        </li>
      </nav>
      </div>
    </div>

  )
}

export default SideBar
