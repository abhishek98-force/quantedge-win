import { Outlet, Link } from 'react-router-dom';
const root = () => {
  return (
    <div>
      <div className="fixed left-0 w-1/5 h-screen bg-slate-500">
        <div className="text-xl my-4 pl-2">Quantedge</div>
        <div className="pl-3">
          <nav className="list-none">
            <li>
              <ul>
                <li>
                  <Link to={`home`}>Home</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to={`technical-analysis`}>Technical Analysis</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to={`sentiment-analysis`}>Sentiment Analysis</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to={`fundamental-analysis`}>Fundamental Analysis</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to={`prompts`}>Prompts</Link>
                </li>
              </ul>
            </li>
          </nav>
        </div>
      </div>
      <div className="ml-[20%] p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default root;
