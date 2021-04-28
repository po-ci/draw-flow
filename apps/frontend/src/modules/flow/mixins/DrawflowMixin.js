import StateNode from "../nodes/StateNode/StateNode";

export default {
    data() {
        return {
            editor: null,
            mobile_item_selec: null
        }
    },
    methods: {
        positionMobile(ev) {
            this.mobile_last_move = ev;
        },
        allowDrop(ev) {
            ev.preventDefault();
        },
        drag(ev) {
            if (ev.type === "touchstart") {
                this.mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
            } else {
                ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
            }
        },
        drop(ev) {
            if (ev.type === "touchend") {
                let parentdrawflow = document.elementFromPoint(this.mobile_last_move.touches[0].clientX, this.mobile_last_move.touches[0].clientY).closest("#drawflow");
                if (parentdrawflow != null) {
                    this.addNodeToDrawFlow(this.mobile_item_selec, this.mobile_last_move.touches[0].clientX, this.mobile_last_move.touches[0].clientY);
                }
                this.mobile_item_selec = null;
            } else {
                ev.preventDefault();
                let data = ev.dataTransfer.getData("node");
                this.addNodeToDrawFlow(data, ev.clientX, ev.clientY);
            }

        },
        addNodeToDrawFlow(name, pos_x, pos_y) {
            if (this.editor.this.editor_mode === 'fixed') {
                return false;
            }
            pos_x = pos_x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)));
            pos_y = pos_y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.this.editor.zoom)));

            switch (name) {
                case 'StateNode':
                    this.editor.addNode('StateNode', 0, 1, pos_x, pos_y, 'StateNode', {}, StateNode, 'vue');
                    break;


            }
        }
    }
}
