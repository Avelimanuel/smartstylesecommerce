import React from "react";
import { cn } from "@/lib/utils";

const Checkoutsteps = ({ current = 0 }) => {
  return (
    <>
      <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb:10">
        {['User Login','Shipping Address','Payment Method','Place Order'].map((step,index)=>(
            <React.Fragment key={step}>
                <div className={cn('p-2 text-center w-56 rounded-full text-sm',
                    index === current ? 'bg-secondary' : ''
                )}>
                    {step}
                </div>
                {step != 'Place Order'&&(
                    <hr className="border-gray-300 w-16 mx-2"/>
                )}

            </React.Fragment>

        ))}
      </div>
    </>
  );
};

export default Checkoutsteps;
