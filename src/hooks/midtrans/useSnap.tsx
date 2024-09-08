import { useState, useEffect } from "react";
import { midtransApiUrl } from "../../helper/config";
import { Snap, SnapOptions } from "../../types/midtrans.type";

declare global {
  interface Window {
    snap: Snap;
  }
}

const useSnap = () => {
  const [snap, setSnap] = useState<Snap | null>(null);

  useEffect(() => {
    const myMidtransClientKey = midtransApiUrl;
    const script = document.createElement("script");
    script.src = `${midtransApiUrl}/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token: string, action: SnapOptions) => {
    const isExist = document.getElementById(action.embedId);

    if (snap && isExist) {
      snap.embed(snap_token, action);
    }
  };

  return { snapEmbed };
};

export default useSnap;
