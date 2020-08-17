<template>
   <div ref="draggableContainer" id="draggable-container" @mousedown="dragMouseDown">
    DRAG HERE
  </div>
</template>

<script>
export default {
  name: 'DraggableNote',
  data: function() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      }
    }
  },
  methods: {
      dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
</script>

<style scoped>
#draggable-container{
  position: absolute;
  border-radius: 20px;
  height: 10%;
  width: 10%;
  z-index: 9;
  background-color: #2196F3;
  text-align: center;
  color: #fff;
  font-family: 'Quicksand';
  font-weight: 600;
}
#draggable-header{
  padding: 10px;
  border-radius: 20px;
  cursor: move;
  z-index: 10;
  background-color: gold;
  color: #fff;
}
</style>
