import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark} from '@fortawesome/free-solid-svg-icons'

const SideItems=(props)=>{
        const showItems=()=>{
        return props.chapters.map((item,i)=>{
            return(
                <div key={i} className={`options`}>
                <Link to={`/${i+1}/${item}`}>
                {/* <FontAwesomeIcon className={`icons`} icon={} /> */}
                {i+1}.{item}
                    </Link>
             </div>
            )          
        }
        )
    }
    return (
        <div>
     {showItems()}
        </div>      
    )
  }
export default SideItems;