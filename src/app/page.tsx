import Withdraw from "./(route)/income/components/withdraw";
import Game from "./(route)/game/page";


function page() {
  return (
    <div>
     <Withdraw/>
     <Game/>
     <div className="pool"></div>
    </div>
  )
}

export default page
