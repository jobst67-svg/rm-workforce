# RM Workforce – Supabase E-Mail-Vorlagen

Die HTML-Dateien sind für **Supabase → Authentication → Email Templates** vorbereitet.

| Supabase-Vorlage | Betreff | Datei |
|---|---|---|
| Confirm signup | Bestätige deine E-Mail-Adresse · RM Workforce | `confirm-signup.html` |
| Reset password | Setze dein Passwort zurück · RM Workforce | `reset-password.html` |
| Magic Link | Dein sicherer Anmeldelink · RM Workforce | `magic-link.html` |
| Change Email Address | Bestätige deine neue E-Mail-Adresse · RM Workforce | `change-email.html` |
| Invite user | Deine Einladung zu RM Workforce | `invite-user.html` |
| Reauthentication | Dein Bestätigungscode · RM Workforce | `reauthentication.html` |

Alle Auth-Vorlagen verwenden Supabase-Platzhalter und enthalten bewusst keinen Abmeldelink. Sie sind notwendige Konto-, Bestätigungs- oder Sicherheitsmails.

Für freiwillige Neuigkeiten und Produkt-Updates lautet der Abmeldelink:

`https://rm-workforce.de/email-abmelden.html?email={{EMAIL}}`

`{{EMAIL}}` muss beim Versand der freiwilligen Mail durch die tatsächliche Empfängeradresse ersetzt und URL-kodiert werden.
