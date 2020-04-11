class SendGinebritaMailer < ApplicationMailer
  def new_send_ginebrita_email(message)
    @message = message

    mail(from: 'Web Kream', to: Settings.mailer.send_ginebrita_mail, subject: message.truncate(50))
  end
end
