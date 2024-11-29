import GeneratorLogo from '../assets/generatorius.svg?react'
import RotaryHammerLogo from '../assets/perforatorius.svg?react'
import ElectricRouterLogo from '../assets/elektrine-freza.svg?react'
import RouterLogo from '../assets/freza.svg?react'
import TileCuttingMachineLogo from '../assets/plyteliu-pjovimo-stakles.svg?react'
import CircularSawLogo from '../assets/diskinis-pjuklas.svg?react'
import CuttingMachineLogo from '../assets/pjovimo-stakles.svg?react'
import DemolitionHammersLogo from '../assets/atskelimo-plaktukas.svg?react'
import ChainSawsLogo from '../assets/grandininis-pjuklas.svg?react'
import ConstructionVacuumLogo from '../assets/statybinis-dulkiu-siurblys.svg?react'
import ToolGrid from '../components/ToolGrid';


const Categories = () => {

    const categories = [
        { key: "Generatoriai", title: "Generators", icon: <GeneratorLogo className="w-[100%] h-[100%]"/> },
        { key: "Perforatoriai", title: "Rotary Hammers", icon: <RotaryHammerLogo className="w-[100%] h-[100%]" /> },
        { key: "Elektrinė freza", title: "Electric Routers", icon: <ElectricRouterLogo className="w-[100%] h-[100%]" /> },
        { key: "Freza", title: "Routers", icon: <RouterLogo className="w-[100%] h-[100%]" /> },
        { key: "Plytelių pjovimo staklės", title: "Tile Cutting Machines", icon: <TileCuttingMachineLogo className="w-[100%] h-[100%]" /> },
        { key: "Diskinis pjūklas", title: "Circular Saws", icon: <CircularSawLogo className="w-[100%] h-[100%]" /> },
        { key: "Pjovimo staklės", title: "Cutting Machines", icon: <CuttingMachineLogo className="w-[100%] h-[100%]" /> },
        { key: "Atskėlimo plaktukai", title: "Demolition Hammers", icon: <DemolitionHammersLogo className="w-[100%] h-[100%]" /> },
        { key: "Grandininiai pjūklai", title: "Chain Saws", icon: <ChainSawsLogo className="w-[100%] h-[100%]" /> },
        { key: "Statybinis dulkių siurblys", title: "Construction Vacuums", icon: <ConstructionVacuumLogo className="w-[100%] h-[100%]" /> },
    ]

    return (
        <div>
            <div className='flex justify-center'>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-[80%] max-w-[1300px] mt-3">
                    {categories.map((item) => (
                        <div key={item.key} className='text-center border border-gray-200 flex flex-col items-center w-[140px] lg:w-[155px] xl:w-[200px]'>
                            <span className="text-gray-500 w-[40px] sm:w-[80px] md:w-[120px] lg:w-[150px] lg:h-[150px]">{item.icon}</span>
                            <h3 className="text-[14px] lg:text-[20px]">{item.title}</h3>
                        </div>
                    ))}
                </div>
                {/* <ToolGrid isSearchResult={false} /> */}
            </div>
        </div>
    )
}

export default Categories;