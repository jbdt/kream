class General < ActiveRecord::Base
  before_create :the_only_one

  def the_only_one
    errors.add('Ya extiste') if General.any?
  end
end
