/**
 *
 * @author    Edward S. Ramos
 * @since     8/May/2019
 */

const toggleWarningMessage = (elementId, isVisible = true, msg = null) => {
  if (!elementId) {
    return
  }

  const $el = document.getElementById(elementId)

  if ($el) {
    const value = isVisible ? 'unset' : 'none'
    $el.setAttribute('style', `display: ${value}`)

    if ($el.innerText !== msg) {
      $el.innerText = msg
    }
  }
}

const appendWarningMessage = ($el, warningComponent) => {
  if ($el && $el.parentNode) {
    $el.parentNode.appendChild(warningComponent)
  }
}

const checkCondition = (meetCondition, { $el, inputClasses }) => {
  if (meetCondition) {
    inputClasses.map(clas => $el.classList.add(clas))
    return false
  }

  inputClasses.map(clas => $el.classList.remove(clas))
  return true
}

const buildWarningComponent = (msg, msgFor, warningClasses) => {
  const warningId = `${msgFor}-warning`

  if (document.getElementById(warningId)) {
    toggleWarningMessage(warningId, true, msg)
    return
  }

  const p = document.createElement('p')

  p.setAttribute('class', warningClasses.join(' '))
  p.setAttribute('id', warningId)
  p.innerText = msg

  return p
}

const getWarningMessage = (msg, elId, value, pattern, len) => {
  const warMsg = msg || `${elId} is required`

  if (value !== '') {
    if (pattern) {
      return `enter a valid ${elId}`
    } else if (len && value.length < len) {
      return `${elId} must be at least ${len} characters`
    }
  }

  return warMsg
}

const isValid = ({ $el, inputClasses, len = 1, pattern }) => {
  if (!$el) {
    return
  }

  const value = $el.value

  if (pattern) {
    return checkCondition(!pattern.test(value), { $el, inputClasses })
  }

  if ($el.type === 'checkbox' || $el.type === 'radio') {
    return checkCondition(!$el.checked, { $el, inputClasses })
  }

  return checkCondition((!value || value.length < len), { $el, inputClasses })
}

const onBlurElement = (params) => {
  const { $el, len, msg, warningClasses, pattern } = params
  const elId = $el.id

  if (!isValid(params)) {
    const warMsg = getWarningMessage(msg, elId, $el.value, pattern, len)
    const warnComponent = buildWarningComponent(warMsg, elId, warningClasses)

    if (warnComponent) {
      appendWarningMessage($el, warnComponent)
    }

    return
  }

  toggleWarningMessage(`${elId}-warning`, false)
}

const validate = {
  bind: function ($el, binding, vnode) {
    if (!$el.id) {
      throw new Error(`attribute id is required in ${$el.type} element. On ${vnode.context.$vnode.tag}`)
    }

    const params = binding.value || {}
    params.$el = $el
    params.inputClasses = params.inputClasses || ['border-red']
    params.warningClasses = params.warningClasses || ['mt-3', 'text-red', 'text-xs', 'italic']

    $el.addEventListener('blur', onBlurElement.bind(this, params), false)

    setTimeout(function () {
      const $form = $el.form
      $form.addEventListener('submit', onBlurElement.bind(this, params), false)
    }, 1000)
  },
  unbind: function ($el, binding, vnode) {
    const $form = $el.form
    $el.removeEventListener('blur', onBlurElement, false)
    $form.removeEventListener('submit', onBlurElement, false)
  }
}

const vueMandatory = {
  install: function (Vue, options) {
    Vue.directive('mandatory', validate)
  }
}

module.exports = vueMandatory
