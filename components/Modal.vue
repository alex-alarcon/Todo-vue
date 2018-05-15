<template>
  <transition name="modal">
    <div 
      class="modal__mask" 
      v-show="show"
    >
      <div class="modal__container">
        <div class="modal__header">
          <h3>New Todo</h3>
        </div>

        <div class="modal__body">
          <label class="form__label">
            Title
            <input 
              ref="title"
              class="form__control"
            />
          </label>
          
          <label class="form__label">
            Description
            <textarea 
              ref="desc"
              rows="5" 
              class="form__control">
            </textarea>
          </label>
        </div>

        <div class="modal__footer text__right">
          <IconButton 
            icon="times"
            v-bind:onclick="toggle"
            v-bind:styles="{'color': '#a10c0c'}"
          />
          <IconButton
            icon="save" 
            v-bind:onclick="save"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import IconButton from "@/../components/IconButton";

export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean
    },
    create: {
      type: Function
    },
    toggleModal: {
      type: Function
    }
  },
  methods: {
    toggle() {
      this.$refs.title.value = "";
      this.$refs.desc.value = "";
      this.toggleModal();
    },
    save() {
      let title = this.$refs.title.value
      let desc = this.$refs.desc.value

      if(!this.$validator.isEmpty(title, desc)) {
        this.create({
          title: title,
          description: desc,        
        });
        this.toggle();
      }
    }
  },
  components: {
    IconButton
  }
}
</script>

<style lang="sass" scoped>
  *
    box-sizing: border-box

  .modal__mask
    position: fixed
    z-index: 9998
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, .5)
    transition: opacity .3s ease
  
  .modal__container
    width: 300px
    margin: 40px auto 0
    padding: 20px 30px
    background-color: #fff
    border-radius: 2px
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
    transition: all .3s ease
    font-family: Helvetica, Arial, sans-serif

  .modal__header h3
    margin-top: 0
    color: rgba(97, 160,	112, 0.75)

  .modal__body
    margin: 20px 0

  .text__right
    text-align: right

  .form__label
    display: block
    margin-bottom: 1em

  .form__label > .form__control
    margin-top: 0.5em
  
  .form__control
    display: block
    width: 100%
    padding: 0.5em 1em
    line-height: 1.5
    border: 1px solid #ddd
    resize: none

  .modal-enter 
    opacity: 0

  .modal-leave-active 
    opacity: 0
  
  .modal-enter .modal-container,
  .modal-leave-active .modal-container
    -webkit-transform: scale(1.1)
    transform: scale(1.1)
</style>