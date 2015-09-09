export HUB_test_DB="hub_test"
export HUB_test_USER="hub_test"
export HUB_test_PASS="whatevs"

export HUB_DEV_DB="hub_development"
export HUB_DEV_USER="hub_development"
export HUB_DEV_PASS="whatevs"

PATH=$PATH:/usr/local/Cellar/postgresql/9.4.4/bin/psql

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
