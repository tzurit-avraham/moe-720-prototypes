// app.js - faculty dashboard behavior.
// The DS opens/closes the select and fires ds-change with all checked values.
// This file renders the items, keeps "select all" in sync and updates the trigger text.

(function () {
  // Only on the dashboard page (index.html)
  if (!document.getElementById('group-select')) return;

  var data = window.APP_DATA;
  var CHECK_SVG = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var select = document.getElementById('group-select');
  var trigger = document.getElementById('group-trigger');
  var triggerText = document.getElementById('group-trigger-text');
  var itemsBox = document.getElementById('group-items');
  var selectAll = document.getElementById('select-all');
  var studentCount = document.getElementById('student-count');

  function setText(id, text) {
    document.getElementById(id).textContent = text;
  }

  function renderHeader() {
    setText('teacher-name', data.teacher.fullName);
    setText('greeting', 'שלום ' + data.teacher.firstName);
  }

  function renderStats() {
    var s = data.stats;
    setText('stat-active', s.active);
    setText('stat-attention', s.attention);
    document.getElementById('stat-time').innerHTML =
      s.avgTime.value + ' <span class="app-stat-unit">' + s.avgTime.unit + '</span>';
    document.getElementById('stat-tutor').innerHTML =
      s.tutor.questions + ' <span class="app-stat-unit app-stat-unit-group">שאלות' +
      '<span class="app-stat-sep" aria-hidden="true"></span>' + s.tutor.minutes + ' דקות</span>';
    setText('stat-units', s.units.value);
    setText('stat-units-note', s.units.note);
    setText('stat-steps', s.steps.value);
    setText('stat-steps-note', s.steps.note);
    setText('stat-success', s.success.value);
    setText('stat-success-trend', s.success.trend);
  }

  // Markup follows the DS multi-select pattern: label.ds-select-item > checkbox + label span
  function renderGroups() {
    itemsBox.innerHTML = data.groups.map(function (g) {
      return '<label class="ds-select-item" data-value="' + g.id + '">' +
        '<label class="ds-checkbox" style="pointer-events:none">' +
          '<input type="checkbox" class="ds-checkbox-input app-group-cb" value="' + g.id + '">' +
          '<span class="ds-checkbox-indicator">' + CHECK_SVG + '</span>' +
        '</label>' +
        '<span class="ds-select-item-label">' + g.name +
          '<span class="ds-select-item-desc app-group-meta">' + g.students + ' תלמידים</span>' +
        '</span>' +
      '</label>';
    }).join('');
  }

  function checkedIds() {
    return Array.prototype.map.call(
      itemsBox.querySelectorAll('.app-group-cb:checked'),
      function (cb) { return cb.value; }
    );
  }

  function update() {
    var ids = checkedIds();
    var total = data.groups.length;

    if (ids.length === 0) {
      triggerText.textContent = 'בחרו קבוצות';
    } else if (ids.length === 1) {
      triggerText.textContent = data.groups.filter(function (g) { return g.id === ids[0]; })[0].name;
    } else if (ids.length === total) {
      triggerText.textContent = 'כל הקבוצות';
    } else {
      triggerText.textContent = 'נבחרו ' + ids.length + ' קבוצות';
    }

    selectAll.checked = ids.length === total;
    selectAll.indeterminate = ids.length > 0 && ids.length < total;

    var students = ids.length === 0
      ? data.totalStudents
      : data.groups.reduce(function (sum, g) {
          return ids.indexOf(g.id) > -1 ? sum + g.students : sum;
        }, 0);
    studentCount.textContent = students + ' תלמידים';
  }

  // "Select all" also lives in the menu, so the DS reports it too; handle it first.
  selectAll.addEventListener('change', function () {
    Array.prototype.forEach.call(itemsBox.querySelectorAll('.app-group-cb'), function (cb) {
      cb.checked = selectAll.checked;
    });
    update();
  });

  select.addEventListener('ds-change', update);

  renderHeader();
  renderStats();
  renderGroups();
  update();

  // The Figma frame shows the list open on load
  select.classList.add('ds-select-open');
  trigger.setAttribute('aria-expanded', 'true');
})();

// ===== Landing page (landing.html) =====
// Language switch (Hebrew / Arabic) on the DS segmented control, and a shadow
// under the sticky header once the page scrolls.
(function () {
  var root = document.getElementById('landing');
  if (!root) return;

  var texts = window.LANDING_I18N;
  var langSwitch = document.getElementById('landing-lang');
  var header = root.querySelector('.landing-header');
  var STORAGE_KEY = 'moe_demo_landing_lang';

  function setLang(lang) {
    if (!texts[lang]) return;
    // Both languages are RTL; set them on the root too so it works inside a KMS page
    document.documentElement.lang = lang;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', 'rtl');
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = texts[lang][el.getAttribute('data-i18n')];
      if (value) el.textContent = value;
    });
    langSwitch.querySelectorAll('.ds-segmented-item').forEach(function (item) {
      item.setAttribute('aria-checked', item.getAttribute('data-value') === lang ? 'true' : 'false');
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  langSwitch.addEventListener('ds-change', function (e) {
    setLang(e.detail.value);
  });

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  // Always apply on load so data.js is the single source of the page text
  setLang(texts[saved] ? saved : 'he');

  function updateHeader() {
    header.classList.toggle('landing-header-stuck', window.scrollY > 0);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();

// ===== Prototype-only: dark / light version switch (landing.html <-> landing-light.html) =====
// The floating panel opens the other version at the same point of the page.
// Language carries over on its own (it is saved in localStorage above).
(function () {
  var versionSwitch = document.getElementById('proto-version');
  if (!versionSwitch) return;

  var SCROLL_KEY = 'proto_version_scroll';

  function scrollRatio() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
  }

  versionSwitch.addEventListener('ds-change', function (e) {
    try { sessionStorage.setItem(SCROLL_KEY, String(scrollRatio())); } catch (err) {}
    window.location.href = e.detail.value;
  });

  // Coming from the other version: go to the same relative point (the two pages differ a little in height)
  var saved = null;
  try {
    saved = sessionStorage.getItem(SCROLL_KEY);
    sessionStorage.removeItem(SCROLL_KEY);
  } catch (err) {}
  if (saved !== null) {
    window.addEventListener('load', function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: parseFloat(saved) * max, behavior: 'instant' });
    });
  }
})();

// ===== Unit page (unit.html) =====
// Renders the unit and its lessons from data.js. Static front end: the only
// working controls are the play buttons, which open the lesson page.
(function () {
  var body = document.getElementById('unit-lessons-body');
  if (!body) return;

  var unit = window.UNIT_DATA;
  var HINT_ARROW_UP = '<svg width="14" height="9" viewBox="0 0 14 9" fill="none"><path d="M0 9L5.4 2Q7 0 8.6 2L14 9Z" fill="currentColor"/></svg>';

  function setText(id, text) {
    document.getElementById(id).textContent = text;
  }

  function esc(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  setText('teacher-name', window.APP_DATA.teacher.fullName);
  setText('unit-subject', unit.subject);
  setText('unit-title', unit.title);
  setText('unit-goals', unit.goals);
  setText('unit-topic', unit.topic);
  setText('unit-subtopic', unit.subtopic);

  var goalsHtml = unit.levelGoals.map(function (g) {
    return '<dt>' + esc(g.level) + '</dt><dd><span dir="ltr">' + esc(g.text) + '</span></dd>';
  }).join('');

  body.innerHTML = unit.lessons.map(function (l, i) {
    var n = i + 1;
    var goalsId = 'unit-goals-' + n;
    return '<tr class="unit-lesson">' +
      '<td>' +
        '<div class="ds-hint-trigger">' +
          '<a class="ds-btn ds-btn-md ds-btn-secondary ds-btn-icon" href="lesson.html" aria-label="לנסות שיעור זה כתלמיד: ' + esc(l.name) + '">' +
            '<ds-icon name="play" size="24"></ds-icon></a>' +
          '<div class="ds-hint ds-hint-bottom" aria-hidden="true">' +
            '<div class="ds-hint-body">לנסות שיעור זה כתלמיד</div>' +
            '<div class="ds-hint-arrow">' + HINT_ARROW_UP + '</div>' +
          '</div>' +
        '</div>' +
      '</td>' +
      '<td class="unit-num">' + n + '</td>' +
      '<td class="unit-name"><span dir="ltr">' + esc(l.name) + '</span></td>' +
      '<td>' + (l.mandatory ? '<ds-icon name="check" size="24" role="img" aria-label="חובה"></ds-icon>' : '') + '</td>' +
      '<td>' + esc(l.purpose) + '</td>' +
      '<td><a class="unit-link unit-skills" href="#">' + l.skills + ' מיומנויות</a></td>' +
      '<td>' + esc(l.mastery) + '</td>' +
      '<td>' + l.minutes + ' דק׳</td>' +
      '<td>' + l.difficulty + '</td>' +
      '<td class="unit-toggle-cell">' +
        '<button class="unit-goals-toggle" type="button" aria-expanded="false" aria-controls="' + goalsId + '">' +
          '<span>יעדי הלמידה</span><ds-icon name="chevron-down" size="24"></ds-icon>' +
        '</button>' +
      '</td>' +
    '</tr>' +
    '<tr class="unit-goals" id="' + goalsId + '" hidden>' +
      '<td colspan="10"><dl class="unit-goals-list">' + goalsHtml + '</dl></td>' +
    '</tr>';
  }).join('');

  // Static, as in the Figma frame: the first lesson is shown open
  var first = body.querySelector('.unit-goals-toggle');
  first.setAttribute('aria-expanded', 'true');
  document.getElementById(first.getAttribute('aria-controls')).hidden = false;
})();



