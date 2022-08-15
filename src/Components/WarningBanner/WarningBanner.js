import { ImCross } from 'react-icons/im';
import { useState } from 'react';

export default function WarningBanner() {
    const [show, setShow] = useState(true);

    return (
        show && <div className="WarningBanner">
            <p>Im am not 100% sure that this is completly secure so please use a unique password.</p>
            <ImCross onClick={() => setShow(false)} />
        </div>
    )
}
