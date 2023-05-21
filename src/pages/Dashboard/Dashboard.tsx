import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootTypes } from "../../store";
import Tank from '../../components/waterTank/tank.tsx'




export const Dashboard = (props: any) => {
    const appstore = useSelector((state: RootTypes) => state.appStore);
    console.log(appstore, "appstore");

    const [count, setCount] = useState(0)
    const [color, setState ] = useState('#038aff');
    const [fontColorBack, setFontBackColor] = useState('#fe7968')
    const [fillValue, setFillValue ] = useState(50)
    const [ title, setTitle] = useState('Line1')

    const [ tabs, setTabs ] = useState('tab1');

    const handleTab = (value: any) => {
        setTabs(value)
    }

    return <div>
   {/* `   <WaterTank 
        color={color}
        fillMaxValue={100}
        title={title}
        backFontColor={fontColorBack}
        fillValue={fillValue}
        // frontFontColor={}
      />` */}


    <div className="main-container " id="container">

 
        <div id="content" className="main-content">
            <div className="middle-content">
                    <div className="">
                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Storage Area</a></li>
                            </ol>
                        </nav>
                    </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="simple-pill">
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button onClick={() => handleTab('tab1')} className="nav-link active"  type="button">Home</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={() => handleTab('tab2')} className="nav-link" id="pills-profile-tab" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Pre Mix/Mixing</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                { tabs === 'tab1' ? 
                    <div className="row layout-top-spacing">
                    
                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">

                                                
                                                <Tank 
                                                        color={color}
                                                        fillMaxValue={100}
                                                        clName={'tank1'}
                                                        key={color}
                                                        title={'Line 1'}
                                                        backFontColor={fontColorBack}
                                                        fillValue={fillValue}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank2'}
                                                    key={color}
                                                    title={'Line 2'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={60}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank3'}
                                                    title={'Line 3'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank4'}
                                                    title={'Line 4'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank5'}
                                                    title={'Line 5'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank6'}
                                                    title={'Line 6'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank7'}
                                                    title={'Line 7'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank8'}
                                                    title={'Line 8'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank9'}
                                                    title={'Line 9'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank10'}
                                                    title={'Line 10'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank11'}
                                                    title={'Line 11'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-meta">
                                        <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <Tank
                                                    color={color}
                                                    fillMaxValue={100}
                                                    clName={'tank12'}
                                                    title={'Line 12'}
                                                    backFontColor={fontColorBack}
                                                    fillValue={90}
                                                        // frontFontColor={}
                                                    />
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    :
                    <div className="row layout-top-spacing">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="page-meta">
                                            <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    
                                                    <Tank 
                                                            color={'#e33d94'}
                                                            fillMaxValue={100}
                                                            clName={'tank20'}
                                                            key={'#e33d94'}
                                                            title={'Line 1'}
                                                            backFontColor={fontColorBack}
                                                            fillValue={fillValue}
                                                            // frontFontColor={}
                                                        />
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="page-meta">
                                            <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    
                                                    <Tank 
                                                            color={'#e33d94'}
                                                            fillMaxValue={100}
                                                            clName={'tank21'}
                                                            key={'#e33d94'}
                                                            title={'Line 21'}
                                                            backFontColor={fontColorBack}
                                                            fillValue={fillValue}
                                                            // frontFontColor={}
                                                        />
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="page-meta">
                                            <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    
                                                    <Tank 
                                                            color={'#e33d94'}
                                                            fillMaxValue={100}
                                                            clName={'tank23'}
                                                            title={'Line 21'}
                                                            backFontColor={fontColorBack}
                                                            fillValue={fillValue}
                                                            // frontFontColor={}
                                                        />
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="page-meta">
                                            <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    
                                                        <Tank 
                                                            color={color}
                                                            fillMaxValue={100}
                                                            clName={'tank24'}
                                                            title={'Line 1'}
                                                            backFontColor={fontColorBack}
                                                            fillValue={fillValue}
                                                            // frontFontColor={}
                                                        />
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="page-meta">
                                            <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    
                                                    <Tank 
                                                            color={color}
                                                            fillMaxValue={100}
                                                            clName={'tank25'}
                                                            key={color}
                                                            title={'Line 21'}
                                                            backFontColor={fontColorBack}
                                                            fillValue={fillValue}
                                                            // frontFontColor={}
                                                        />
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="page-meta">
                                            <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    
                                                        <Tank 
                                                            color={color}
                                                            fillMaxValue={100}
                                                            clName={'tank26'}
                                                            key={color}
                                                            title={'Line 26'}
                                                            backFontColor={fontColorBack}
                                                            fillValue={fillValue}
                                                            // frontFontColor={}
                                                        />
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
               
               
            </div>

            <div className="footer-wrapper">
                <div className="footer-section f-section-1">
                </div>
                <div className="footer-section f-section-2">
                </div>
            </div>
            
        </div>

    </div>

       
    </div>;
  };