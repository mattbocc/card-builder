import axios from 'axios';
import type { CardStyleType } from '../../types/CardStyleType';
import type { EnergyType } from '../../types/EnergyType';
import type { AbilityType } from '../../types/AbilityType';

type SubmitProps = {
    cardStyle: CardStyleType;
    evolution: string;
    cardType: string;
    specialEvent: string;
    title: string;
    showHP: boolean;
    health: string;
    weaknessEnergy: EnergyType;
    resistanceEnergy: EnergyType;
    retreatEnergy: EnergyType;
    ability: AbilityType;
    orderNumber: string;
};

const SubmitButton: React.FC<SubmitProps> = submission => {
    async function submitSettings() {
        try {
            console.log(submission);
            const res = await axios.post('/api/poke/etsy/submit', { submission: submission });
            alert(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <button
            className="flex gap-2 py-1.5 min-w-[170px] rounded-2xl justify-center items-center font-semibold text-headingMd smd:text-headingXs text-white bg-blue-700 hover:cursor-pointer hover:bg-blue-500 transition delay-50 duration-100 ease-in-out"
            onClick={() => submitSettings()}
        >
            Submit Card
            <img src="/images/general_icons/submit-white.png" className="w-5" />
        </button>
    );
};

export default SubmitButton;
