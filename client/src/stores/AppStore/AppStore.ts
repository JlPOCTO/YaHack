import sideBar from "../../components/SideBar/SideBar";

type SideBarProps = {
    test : string|null;
}
export const createAppStore = (props: SideBarProps) => {
    return {
        test: props.test || 'Hello world',
        toggleTest: function () {
            this.test = this.test === 'Hi!' ? 'How are you?' : 'Hi!';
        },

    };
};