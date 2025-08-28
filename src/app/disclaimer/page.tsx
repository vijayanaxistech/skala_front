import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Suvarnakala Pvt. Ltd",
};
export default function DisclaimerPage() {
  return (
    <main className="p-5 bg-light text-justify">
      <h1 className="mb-4 fraunces">Disclaimer</h1>
      <p>
        The information contained in this website is for general information purposes only. The
        information is provided by Suvarnakala Pvt. Ltd. and while we endeavor to keep the
        information up to date and correct, we make no representations or warranties of any kind,
        express or implied, about the completeness, accuracy, reliability, suitability or
        availability with respect to the website or the information, products, services, or related
        graphics contained on the website for any purpose. Any reliance you place on such
        information is therefore strictly at your own risk.
      </p>
      <p>
        In no event will we be liable for any loss or damage including without limitation, indirect
        or consequential loss or damage, or any loss or damage whatsoever arising from loss of data
        or profits are arising out of, or in connection with, the use of this website.
      </p>
      <p>
        Through this website you are able to link to other websites which are not under the control
        of Suvarnakala Pvt. Ltd. We have no control over the nature, content and availability of
        those sites. The inclusion of any links does not necessarily imply a recommendation or
        endorse the views expressed within them.
      </p>
      <p>
        Every effort is made to keep the website up and running smoothly. However, Suvarnakala Pvt.
        Ltd. takes no responsibility for, and will not be liable for, the website being temporarily
        unavailable due to technical issues beyond our control.
      </p>
    </main>
  );
}
